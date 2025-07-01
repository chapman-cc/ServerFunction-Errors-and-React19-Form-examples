export class CustomFormError extends Error {
  public field: string;

  constructor(field: string, ...props: Parameters<typeof Error>) {
    super(...props);
    this.field = field;
  }
}
