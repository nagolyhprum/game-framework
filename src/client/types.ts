export type Rect = {
    x : number;
    y : number;
    width : number;
    height : number;
};

export type KeyEventConfig = {
    name : "keydown" | "keyup";
    key : keyof typeof KEY;
};

export type InputEventConfig = KeyEventConfig;

export type Output = {
    setFill(fill : string) : void;
    fillRect(x : number, y : number, width : number, height : number) : void;
    getWidth() : number;
    getHeight() : number;
    save(): void;
    restore(): void;
    translate(x : number, y : number): void;
    fillText(text : string, x : number, y : number): void;
    setTextAlign(align : Alignment): void;
    setTextBaseline(align : Baseline): void;
    onEvent(callback : (config : InputEventConfig) => void) : void;
    path(builder : (context : CanvasRenderingContext2D) => void) : void;
    setStroke(stroke : string): void;
    stroke(): void;
    fill(): void;
    setDash(dash : number[]): void;
    strokeRect(x : number, y : number, width : number, height : number): void;
};

export type Alignment = "left" | "center" | "right";

export type Baseline = "top" | "middle" | "bottom";

export type RectConfig<T> = EntityConfig<T, {
    fill ?: string;
}>;

export type TextConfig<T> = EntityConfig<T, {
    text ?: string;
    fill ?: string;
    align ?: Alignment;
    baseline ?: Baseline;
}>;

export type Anchor = {
    x ?: number;
    y ?: number;
};

export type EventConfig<T, U, V> = {
    entity : EntityConfig<T, U> & U;
    state : T;
    data : V;
};

export type DrawEventConfig<T, U> = {
    entity : EntityConfig<T, U>;
    output : Output;
};

export type CollisionEventConfig<T, U> = EventConfig<T, U, {
    other : EntityConfig<T, unknown>;
    coordinate : "x" | "y";
}>;

export type EntityConfig<T, U> = {
    x : number;
    y : number;
    width ?: number;
    height ?: number;
    anchor ?: Anchor;
    name ?: string;
    events ?: {
        keydown ?: Partial<Record<keyof typeof KEY, (event : EventConfig<T, U, null>) => void>>;
        keyup ?: Partial<Record<keyof typeof KEY, (event : EventConfig<T, U, null>) => void>>;
        collision ?: Record<string, (event : CollisionEventConfig<T, U>) => void>;
        update ?: (event : EventConfig<T, U, {
            delta : number;
        }>) => void;
    };
    velocity ?: {
        x ?: number;
        y ?: number;
    };
    draw: (event : DrawEventConfig<T, U>) => void;
} & U;

export type WithoutDraw<T> = Omit<T, "draw">;

export type Entity<T> = TextConfig<T> | RectConfig<T>;

export type LayerConfig<T> = {
    entities : Entity<T>[];
};

export type SceneConfig<T> = {
    layers : LayerConfig<T>[];
};

export type GameConfig<T> = {
    debug ?: boolean;
    state : T;
    background : string;
    scene : string;
    scenes : Record<string, SceneConfig<T>>;
};

export const KEY = {
	w : "w",
	s : "s",
	ArrowUp : "ArrowUp",
	ArrowDown : "ArrowDown",
} as const;