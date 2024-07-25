import { ICard } from "./cardModel"

export interface IPrepare {
  cards?: ICard[];
  selectedCard_1: ICard;
  selectedCard_2: ICard;
  selectedIndex_1: number;
  selectedIndex_2: number;
  progress?: number;
  flipAudio?: HTMLAudioElement;
  correctAudio?: HTMLAudioElement;
  wrongAudio?: HTMLAudioElement;
  completeAudio?: HTMLAudioElement;
  gameOverAudio?: HTMLAudioElement;
}
