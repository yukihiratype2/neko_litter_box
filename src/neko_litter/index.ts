import { debounce } from "lodash";
import { HardwareController } from "../hardware";
import { BehaviorSubject } from "rxjs";

export class NekoLitter {
  config: NekoLitterConfig;
  hardware: HardwareController

  constructor(config: NekoLitterConfig, hardware: HardwareController) {
    this.config = config;
    this.hardware = hardware;

    this.debouncedCleanScopes = debounce(this.clean, this.config.autoCleanWaitDuration * 1000);

    this.regist_event();
  }

  lastCleanedAt = new BehaviorSubject(0);

  cleaning = new BehaviorSubject(false);

  catPresentAt = new BehaviorSubject(0);

  catPresent = new BehaviorSubject(false);

  private debouncedCleanScopes;

  private regist_event() {
    this.hardware.catPresent.subscribe((catPresent) => {
      if (!catPresent) {
        this.handleCatLeave();
      }
    });
  }

  private handleCatLeave() {
    if (this.config.autoCleanEnabled) {
      this.debouncedCleanScopes();
    }
  }

  private get isSafeToClean() {
    return !this.hardware.hal.wasteBinInstallation.value && !this.hardware.hal.wasteBinFull.value
  }

  async clean() {
    return new Promise<void>((resolve, reject) => {
      if (!this.isSafeToClean) {
        reject();
        return;
      }
      this.hardware.cleanScopes().subscribe({
        next: () => {
          this.cleaning.next(true);
        },
        complete: () => {
          this.lastCleanedAt.next(Date.now());
          this.cleaning.next(false);
          resolve();
        }
      });
    });
  }

  get status(): NekoLitterStatus {
    return {
      catPresent: false,
      wasteBinInstalled: true,
      wasteBinFull: false,
      cleaning: this.cleaning.value,
      lastCleanedAt: this.lastCleanedAt.value,
    }
  }

}

export let nekoLitter: NekoLitter;