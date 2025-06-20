import { Artist } from "./artist";
import { Track } from "./track";

export interface Album{
  id?: number;
  albumName: string;
  genre: string;
  track: Track;
  artist?: Artist[];
}
