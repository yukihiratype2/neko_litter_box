import { BehaviorSubject } from 'rxjs';

export enum BoxRotateDirection {
  CLOCKWISE,
  COUNTER_CLOCKWISE
}

export enum BoxPosition {
  WORK,
  CLEAN,
  CLEAR
}

// enum LEDStatus {}


export abstract class Hal {
  abstract rotateBox(direction: BoxRotateDirection): void;

  abstract stopRotate(): void;

  abstract boxPosition: BehaviorSubject<BoxPosition>;

  abstract weight: BehaviorSubject<number>;

  abstract wasteBinInstallation: BehaviorSubject<boolean>;

  abstract wasteBinFull: BehaviorSubject<boolean>;

  abstract safetyLock: BehaviorSubject<boolean>;
}
