export class PhotoComment {
  content: string;
  createdAt: Date = new Date();

  constructor(content: string) {
      this.content = content;
  }
}