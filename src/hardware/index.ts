import { BehaviorSubject, Observable, take, timer } from "rxjs";
import { BoxPosition, BoxRotateDirection, Hal } from "../hal";

enum BoxCleaningStatus {
  CLEANING,
  CLEANING_PAUSED,
  RESETING,
  RESETING_PAUSED
}

export class HardwareController {
  constructor(hal: Hal) {
    this.hal = hal;
    this.init();
  }

  hal: Hal;

  calibratedWeight: number = 0;

  catPresent = new BehaviorSubject(false);

  private async init() {
    await this.calibrateWeight();
    await this.selfCheck();
    this.registEvent();
  }

  private async calibrateWeight() {
    const measures: number[] = [];
    return new Promise<void>((resolve) => {
      timer(0, 500).pipe(take(5)).subscribe({
        next: async () => {
          measures.push(this.hal.weight.getValue());
        },
        complete: () => {
          this.calibratedWeight = measures.reduce((a, b) => a + b, 0) / measures.length;
          resolve();
        }
      });
    });
  }

  private registEvent() {
    this.hal.weight.subscribe(this.handleWeightChange);
  }

  private handleWeightChange(weight: number) {
    if (weight - this.calibratedWeight > 100) {
      this.catPresent.next(true);
    } else {
      this.catPresent.next(false);
    }
  }

  private async selfCheck() { }

  cleanScopes() {
    return new Observable<BoxCleaningStatus>((observer) => {
      let boxStatus = BoxCleaningStatus.CLEANING;


      const doClean = async () => {
        observer.next(BoxCleaningStatus.CLEANING)
        const catPresentSubscription = this.catPresent.subscribe((catPresent) => {
          if (catPresent) {
            observer.next(BoxCleaningStatus.CLEANING_PAUSED);
            this.hal.stopRotate();
          } else {
            catPresentSubscription.unsubscribe();
            boxPositionSubscription.unsubscribe();
            doClean();
          }
        });
        const boxPositionSubscription = this.hal.boxPosition.subscribe((boxPosition) => {
          if (boxPosition === BoxPosition.CLEAN) {
            this.hal.stopRotate();
            boxStatus = BoxCleaningStatus.RESETING;
            boxPositionSubscription.unsubscribe();
            catPresentSubscription.unsubscribe();
            doReset();
          }
        });

        const doReset = async () => {
          observer.next(BoxCleaningStatus.RESETING);
          const catPresentSubscription = this.catPresent.subscribe((catPresent) => {
            if (catPresent) {
              observer.next(BoxCleaningStatus.RESETING_PAUSED);
              this.hal.stopRotate();
            } else {
              catPresentSubscription.unsubscribe();
              boxPositionSubscription.unsubscribe();
              doReset();
            }
          });
          const boxPositionSubscription = this.hal.boxPosition.subscribe((boxPosition) => {
            if (boxPosition === BoxPosition.WORK) {
              this.hal.stopRotate();
              boxStatus = BoxCleaningStatus.CLEANING;
              boxPositionSubscription.unsubscribe();
              catPresentSubscription.unsubscribe();
              observer.complete();
            }
          });
        }

        this.hal.rotateBox(BoxRotateDirection.CLOCKWISE);
      }

      doClean();
    });
  }

  async clearLitter() { }

}