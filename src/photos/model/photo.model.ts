import { PhotoComment } from "./photo-comment.model";

export class Photo {
  fileName: string;
  comments: PhotoComment[] = [];
}