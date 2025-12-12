import { GEAR_LIBRARY } from "./gameContent.js";
import { QUESTS, buildQuestIndex } from "./questData.js";

const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

const defaultQuestState = () => ({
  active: {}, // questId -> { stepId, stepIndex }
  completed: [],
  failed: [],
  unlocked: [],
  locked: [],
  log: [],
});

function getActiveStepId(state, questId) {
  const qState = state.player.quests.active[questId];
  return qState?.stepId || null;
}

function stepById(quest, stepId) {
  if (!quest) return null;
  if (!stepId) return quest.steps?.[0] || null;
  return quest.steps?.find((s) => s.id === stepId) || null;
}

function questOutcomeEdges(quest) {
  const edges = [];
  quest.steps?.forEach((step) => {
    step.choices?.forEach((choice) => {
      const buckets = [choice.success, choice.failure];
      buckets.forEach((bucket) => {
        if (!bucket?.outcomes) return;
        (bucket.outcomes.unlockQuests || []).forEach((q) => edges.push([quest.id, q]));
      });
    });
  });
  return edges;
}

export function createQuestManager(getState) {
  const index = buildQuestIndex();

  function ensureQuestState(state) {
    if (!state.player) state.player = {};
    if (!state.player.flags) state.player.flags = {};
    if (!state.player.quests) state.player.quests = defaultQuestState();
    state.player.quests.active = state.player.quests.active || {};
    state.player.quests.completed = state.player.quests.completed || [];
    state.player.quests.failed = state.player.quests.failed || [];
    state.player.quests.unlocked = state.player.quests.unlocked || [];
    state.player.quests.locked = state.player.quests.locked || [];
    state.player.quests.log = state.player.quests.log || [];
    return state.player.quests;
  }

  function isLocked(questId, qState) {
    return qState.locked.includes(questId);
  }

  function hasCompleted(id, qState) {
    return qState.completed.includes(id);
  }

  function hasFailed(id, qState) {
    return qState.failed.includes(id);
  }

  function prerequisitesMet(quest) {
    const state = getState();
    ensureQuestState(state);
    const qState = state.player.quests;
    const prereq = quest.prerequisites || {};
    if (isLocked(quest.id, qState)) return false;
    if (hasFailed(quest.id, qState) && !quest.repeatable) return false;
    if (!quest.repeatable && hasCompleted(quest.id, qState)) return false;
    if (prereq.completedQuests?.some((q) => !qState.completed.includes(q))) return false;
    if (prereq.requiredItems?.some((id) => !state.player.inventory?.some((it) => it.id === id))) return false;
    if (prereq.requiredStats) {
      const stats = state.player.stats || {};
      if (Object.entries(prereq.requiredStats).some(([key, val]) => (stats[key] || 0) < val)) return false;
    }
    if (prereq.minEnergy && (state.player.phoneEnergy?.current || 0) < prereq.minEnergy) return false;
    return true;
  }

  function getAvailableQuests(locationId) {
    const state = getState();
    ensureQuestState(state);
    return QUESTS.filter((quest) => {
      const locationOk = !locationId || quest.locationId === locationId;
      return locationOk && prerequisitesMet(quest);
    });
  }

  function getQuestWithStatus(id) {
    const state = getState();
    ensureQuestState(state);
    const quest = index.get(id);
    if (!quest) return null;
    const status = hasCompleted(id, state.player.quests)
      ? "completed"
      : state.player.quests.active[id]
        ? "active"
        : hasFailed(id, state.player.quests)
          ? "failed"
          : prerequisitesMet(quest)
            ? "available"
            : "locked";
    return { quest, status };
  }

  function getQuestsForLocation(locationId) {
    const state = getState();
    ensureQuestState(state);
    const list = QUESTS.filter((q) => q.locationId === locationId);
    return list.map((quest) => {
      const status = hasCompleted(quest.id, state.player.quests)
        ? "completed"
        : state.player.quests.active[quest.id]
          ? "active"
          : prerequisitesMet(quest)
            ? "available"
            : "locked";
      return { quest, status, activeStepId: getActiveStepId(state, quest.id) };
    });
  }

  function startQuest(id) {
    const state = getState();
    const qState = ensureQuestState(state);
    const quest = index.get(id);
    if (!quest) return { ok: false, reason: "Quest not found" };
    if (!prerequisitesMet(quest)) return { ok: false, reason: "Prerequisites not met" };
    qState.active[id] = { stepId: quest.steps?.[0]?.id || null, stepIndex: 0 };
    return { ok: true, quest, step: quest.steps?.[0] };
  }

  function markComplete(id) {
    const state = getState();
    const qState = ensureQuestState(state);
    delete qState.active[id];
    if (!qState.completed.includes(id)) qState.completed.push(id);
  }

  function markFailed(id) {
    const state = getState();
    const qState = ensureQuestState(state);
    delete qState.active[id];
    if (!qState.failed.includes(id)) qState.failed.push(id);
  }

  function setStep(id, stepId, stepIndex = 0) {
    const state = getState();
    const qState = ensureQuestState(state);
    qState.active[id] = { stepId, stepIndex };
  }

  function applyOutcomeToState(outcomes = {}) {
    const state = getState();
    ensureQuestState(state);
    const player = state.player || {};
    const quests = player.quests;

    if (outcomes.energy) {
      const energy = player.phoneEnergy || { current: 0, max: 10 };
      energy.current = clamp(energy.current + outcomes.energy, 0, energy.max);
      player.phoneEnergy = energy;
    }

    if (outcomes.time) {
      const time = player.time || { day: 1, hour: 8 };
      let hours = time.hour + outcomes.time;
      let day = time.day;
      while (hours >= 24) {
        day += 1;
        hours -= 24;
      }
      player.time = { day, hour: hours };
    }

    if (typeof outcomes.money === "number") player.money = clamp((player.money || 0) + outcomes.money, -99, 99999);
    if (typeof outcomes.streetCred === "number") player.streetCred = clamp((player.streetCred || 0) + outcomes.streetCred, -50, 999);
    if (typeof outcomes.xp === "number") player.xp = clamp((player.xp || 0) + outcomes.xp, 0, 99999);
    if (typeof outcomes.hp === "number") player.hp = clamp((player.hp || 0) + outcomes.hp, 0, 100);

    if (outcomes.stats) {
      player.stats = player.stats || {};
      Object.entries(outcomes.stats).forEach(([key, delta]) => {
        player.stats[key] = clamp((player.stats[key] || 0) + delta, 1, 99);
      });
    }

    if (outcomes.resources) {
      player.resources = player.resources || {};
      Object.entries(outcomes.resources).forEach(([key, delta]) => {
        const bar = player.resources[key] || { current: 0, max: 10 };
        bar.current = clamp((bar.current || 0) + delta, 0, bar.max || 10);
        player.resources[key] = bar;
      });
    }

    if (outcomes.addItems) {
      player.inventory = player.inventory || [];
      outcomes.addItems.forEach((item) => {
        if (GEAR_LIBRARY[item.id]) {
          player.gearOwned = player.gearOwned || [];
          if (!player.gearOwned.includes(item.id)) player.gearOwned.push(item.id);
          player.gear = player.gear || {};
          const slot = GEAR_LIBRARY[item.id].slot || "device";
          if (!player.gear[slot]) player.gear[slot] = item.id;
          return;
        }
        const existing = player.inventory.find((i) => i.id === item.id);
        if (existing) existing.qty = (existing.qty || 0) + (item.qty || 1);
        else player.inventory.push({ id: item.id, qty: item.qty || 1 });
      });
    }

    if (outcomes.removeItems) {
      player.inventory = player.inventory || [];
      outcomes.removeItems.forEach((item) => {
        const existing = player.inventory.find((i) => i.id === item.id);
        if (!existing) return;
        existing.qty -= item.qty || 1;
        if (existing.qty <= 0) player.inventory = player.inventory.filter((i) => i.id !== item.id);
      });
    }

    if (outcomes.unlockQuests) {
      outcomes.unlockQuests.forEach((id) => {
        if (!quests.unlocked.includes(id)) quests.unlocked.push(id);
      });
    }

    if (outcomes.lockQuests) {
      outcomes.lockQuests.forEach((id) => {
        if (!quests.locked.includes(id)) quests.locked.push(id);
      });
    }

    if (outcomes.setFlags) {
      player.flags = player.flags || {};
      Object.entries(outcomes.setFlags).forEach(([key, value]) => {
        player.flags[key] = value;
      });
    }

  }

  function evaluateChoice(questId, choiceId, randomFn = Math.random) {
    const state = getState();
    const quest = index.get(questId);
    if (!quest) return { ok: false, reason: "Quest missing" };
    const step = stepById(quest, getActiveStepId(state, questId));
    if (!step) return { ok: false, reason: "Step missing" };
    const choice = step.choices?.find((c) => c.id === choiceId);
    if (!choice) return { ok: false, reason: "Choice missing" };
    const player = state.player || {};

    // affordability
    const cost = choice.cost || {};
    const phoneEnergy = player.phoneEnergy || { current: 0, max: 10 };
    if (typeof cost.energy === "number" && phoneEnergy.current < cost.energy) return { ok: false, reason: "Not enough phone energy" };
    const resourceBlock = ["physical", "focus", "nerve"].find((key) => {
      if (typeof cost[key] !== "number") return false;
      const res = player.resources?.[key];
      return !res || res.current < cost[key];
    });
    if (resourceBlock) return { ok: false, reason: `Not enough ${resourceBlock}` };
    if (typeof cost.money === "number" && (player.money || 0) < cost.money) return { ok: false, reason: "Not enough money" };
    if (typeof cost.streetCred === "number" && (player.streetCred || 0) < cost.streetCred) return { ok: false, reason: "Not enough reputation" };
    if (typeof cost.time === "number" && cost.time > 12 && (player.time?.hour || 0) > 20) return { ok: false, reason: "Not enough time left today" };
    if (cost.items) {
      const missing = cost.items.find((req) => !player.inventory?.some((i) => i.id === req.id && i.qty >= (req.qty || 1)));
      if (missing) return { ok: false, reason: `Missing item ${missing.id}` };
    }

    // energy zero gating for online actions
    if (!choice.offline && phoneEnergy.current <= 0) return { ok: false, reason: "Phone battery dead. Charge or rest first." };

    let succeeded = true;
    const { skillCheck, failChance } = choice;
    if (skillCheck) {
      const stat = player.stats?.[skillCheck.stat] || 0;
      succeeded = stat >= (skillCheck.threshold || 0);
    } else if (typeof failChance === "number") {
      succeeded = randomFn() > failChance;
    }

    const outcome = succeeded ? choice.success : choice.failure || choice.success;
    return { ok: true, succeeded, outcome, cost, step, choice, quest };
  }

  function payCost(cost = {}) {
    const state = getState();
    const player = state.player || {};
    if (cost.energy) {
      player.phoneEnergy = player.phoneEnergy || { current: 0, max: 10 };
      player.phoneEnergy.current = clamp(player.phoneEnergy.current - cost.energy, 0, player.phoneEnergy.max);
    }
    if (cost.money) player.money = clamp((player.money || 0) - cost.money, -99, 99999);
    if (cost.streetCred) player.streetCred = clamp((player.streetCred || 0) - cost.streetCred, -50, 999);
    if (cost.items) {
      player.inventory = player.inventory || [];
      cost.items.forEach((req) => {
        const existing = player.inventory.find((i) => i.id === req.id);
        if (existing) {
          existing.qty -= req.qty || 1;
          if (existing.qty <= 0) player.inventory = player.inventory.filter((i) => i.id !== req.id);
        }
      });
    }
    if (cost.physical) {
      const res = player.resources?.physical;
      if (res) res.current = clamp(res.current - cost.physical, 0, res.max);
    }
    if (cost.focus) {
      const res = player.resources?.focus;
      if (res) res.current = clamp(res.current - cost.focus, 0, res.max);
    }
    if (cost.nerve) {
      const res = player.resources?.nerve;
      if (res) res.current = clamp(res.current - cost.nerve, 0, res.max);
    }
  }

  function advanceQuest(questId, outcome) {
    const state = getState();
    const quest = index.get(questId);
    if (!quest) return;
    const qState = ensureQuestState(state);
    const currentIdx = quest.steps.findIndex((s) => s.id === getActiveStepId(state, questId));
    if (outcome?.completeQuest) {
      markComplete(questId);
      return;
    }
    if (outcome?.failQuest) {
      markFailed(questId);
      return;
    }
    if (outcome?.nextStep) {
      setStep(questId, outcome.nextStep, quest.steps.findIndex((s) => s.id === outcome.nextStep));
      return;
    }
    const nextIdx = currentIdx + 1;
    const nextStep = quest.steps[nextIdx];
    if (nextStep) {
      setStep(questId, nextStep.id, nextIdx);
    } else {
      markComplete(questId);
    }
  }

  function resolveChoice(questId, choiceId, randomFn = Math.random) {
    const result = evaluateChoice(questId, choiceId, randomFn);
    if (!result.ok) return result;
    payCost(result.cost);
    const resolvedOutcome = {
      ...(result.outcome || {}),
      outcomes: { ...(result.outcome?.outcomes || {}) },
    };
    if (typeof resolvedOutcome.outcomes.time === "undefined" && typeof result.cost?.time === "number") {
      resolvedOutcome.outcomes.time = result.cost.time;
    }
    applyOutcomeToState(resolvedOutcome.outcomes || {});
    advanceQuest(questId, resolvedOutcome);
    return { ok: true, succeeded: result.succeeded, outcome: resolvedOutcome };
  }

  function validateGraph() {
    const edges = [];
    QUESTS.forEach((q) => edges.push(...questOutcomeEdges(q)));
    const mainQuests = QUESTS.filter((q) => q.type === "main");
    const outgoing = new Map();
    edges.forEach(([from, to]) => {
      if (!outgoing.has(from)) outgoing.set(from, new Set());
      outgoing.get(from).add(to);
    });

    mainQuests.forEach((q) => {
      if (q.stage === 5 && q.act === 3) return; // finale
      const outs = outgoing.get(q.id);
      if (!outs || !Array.from(outs).some((id) => index.get(id)?.type === "main")) {
        console.warn("[QuestValidator] Main quest has no main follow-up:", q.id, q.title);
      }
    });

    // Reachability check
    const reachable = new Set();
    const availableAtStart = mainQuests.filter((q) => (q.prerequisites?.completedQuests || []).length === 0);
    availableAtStart.forEach((q) => reachable.add(q.id));
    let added = true;
    while (added) {
      added = false;
      mainQuests.forEach((q) => {
        if (reachable.has(q.id)) return;
        const prereqs = q.prerequisites?.completedQuests || [];
        if (prereqs.every((id) => reachable.has(id))) {
          reachable.add(q.id);
          added = true;
        }
      });
    }
    mainQuests.forEach((q) => {
      if (!reachable.has(q.id)) {
        console.warn("[QuestValidator] Main quest unreachable from start chain:", q.id, q.title);
      }
    });
  }

  return {
    ensureQuestState,
    getAvailableQuests,
    getQuestsForLocation,
    startQuest,
    resolveChoice,
    getQuestWithStatus,
    validateGraph,
    applyOutcomeToState,
    advanceQuest,
    evaluateChoice,
    markComplete,
  };
}
