export class DeviceUpgradeSystem {
  constructor(playerState, devices) {
    this.player = playerState;
    this.devices = devices;
  }

  currentDevice() {
    return this.devices[this.player.deviceTier] || this.devices[0];
  }

  canUpgrade() {
    return this.player.deviceTier < this.devices.length - 1;
  }

  upgrade(statsSystem) {
    if (!this.canUpgrade()) return { upgraded: false, reason: "Max tier" };
    const nextTier = this.player.deviceTier + 1;
    const device = this.devices[nextTier];
    if (!statsSystem.adjustMoney(-device.cost)) {
      return { upgraded: false, reason: "Not enough money" };
    }
    this.player.deviceTier = nextTier;
    this.player.focus = Math.min(100, this.player.focus + 5);
    return { upgraded: true, device };
  }
}
