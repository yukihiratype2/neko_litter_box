import { BehaviorSubject } from "rxjs";
import { BoxPosition, BoxRotateDirection, Hal } from ".";

export class DummyHal extends Hal {
  boxPosition = new BehaviorSubject(BoxPosition.CLEAN);
  weight = new BehaviorSubject(123);
  wasteBinInstallation = new BehaviorSubject(false);
  wasteBinFull = new BehaviorSubject(false);
  safetyLock = new BehaviorSubject(false);

  rotateBox(direction: BoxRotateDirection) {
    switch (direction) {
      case BoxRotateDirection.CLOCKWISE:
        setTimeout(() => {
          this.boxPosition.next(BoxPosition.CLEAN);
        }, 1000);
        break;
    }
  }

  stopRotate() {}

  cat_in() {
    this.weight.next(12000);
  }

  cat_out() {
    this.weight.next(123);
  }

  waste_bin_full() {
    this.wasteBinFull.next(true);
  }

  waste_bin_empty() {
    this.wasteBinFull.next(false);
  }

  waste_bin_installed() {
    this.wasteBinInstallation.next(true);
  }

}