type NekoLitterStatus =
  NecoLitterWasteBinStatus &
  NekoLitterCatPresentStatus &
  NeckLitterCleaningStatus;

type NekoLitterCatPresentStatus = {
  catPresent: true;
  catWeight: number;
  catPresentDuration: number;
} | {
  catPresent: false;
}

type NecoLitterWasteBinStatus = {
  wasteBinInstalled: boolean;
  wasteBinFull: boolean;
}

type NeckLitterCleaningStatus = {
  cleaning: boolean;
  cleaningStartedAt?: number;
  lastCleanedAt: number;
}