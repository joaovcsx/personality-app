export interface Question {
  description: string,
  number: number,
  alternatives: Array<Alternative>
}

export interface Alternative {
  description: string,
  animal: string
}

export interface Animal {
  name: string,
  url: string,
  description: string,
}

