class NekoLitterConfig {
  constructor() {
    this.autoCleanEnabled = false;
    this.autoCleanWaitDuration = 0;
    this.childLockEnabled = false;
  }
  autoCleanEnabled: boolean;
  /*
    The duration of the auto clean start after cat leave in seconds.
  */
  autoCleanWaitDuration: number;

  childLockEnabled: boolean;

  static fromJSON(json: any): NekoLitterConfig {
    const config = new NekoLitterConfig();
    config.autoCleanEnabled = json.autoCleanEnabled;
    config.autoCleanWaitDuration = json.autoCleanWaitDuration;
    config.childLockEnabled = json.childLockEnabled;
    return config;
  }

  toJSON(): any {
    return {
      autoCleanEnabled: this.autoCleanEnabled,
      autoCleanWaitDuration: this.autoCleanWaitDuration,
      childLockEnabled: this.childLockEnabled
    }
  }

}