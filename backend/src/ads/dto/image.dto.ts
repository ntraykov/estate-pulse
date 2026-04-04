export class ImageDto {
  constructor(
    public readonly id: number,
    public readonly url: string,
    public readonly position: number,
  ) {}
}
