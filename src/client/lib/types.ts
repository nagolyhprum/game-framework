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
    save() : void;
    restore() : void;
    translate(x : number, y : number) : void;
    fillText(text : string, x : number, y : number) : void;
    setTextAlign(align : Alignment) : void;
    setTextBaseline(align : Baseline) : void;
    onEvent(callback : (config : InputEventConfig) => void) : void;
    path(builder : (context : CanvasRenderingContext2D) => void) : void;
    setStroke(stroke : string) : void;
    stroke() : void;
    fill() : void;
    setDash(dash : number[]) : void;
    strokeRect(x : number, y : number, width : number, height : number) : void;
    clear(color : string) : void;
};

export type Alignment = "left" | "center" | "right";

export type Baseline = "top" | "middle" | "bottom";

export type RectConfig<State> = EntityConfig<State, {
    fill ?: string;
}>;

export type TextConfig<State> = EntityConfig<State, {
    text ?: string;
    fill ?: string;
    align ?: Alignment;
    baseline ?: Baseline;
}>;

export type Anchor = {
    x ?: number;
    y ?: number;
};

export type EventConfig<State, EntityData, EventData> = {
    entity : EntityConfig<State, EntityData> & EntityData;
    data : EventData;
    game : GameConfig<State>;
};

export type DrawEventConfig<State, EntityData> = {
    entity : EntityConfig<State, EntityData>;
    output : Output;
};

export type CollisionEventConfig<State, EntityData> = EventConfig<State, EntityData, {
    other : EntityConfig<State, unknown>;
    coordinate : Coordinate;
}>;

export type UpdateEventConfig<State, EntityData> = EventConfig<State, EntityData, {
    delta : number;
}>;

export type EntityConfig<State, EntityData> = {
    x : number;
    y : number;
    width ?: number;
    height ?: number;
    anchor ?: Anchor;
    name ?: string;
    events ?: {
        keydown ?: Partial<Record<keyof typeof KEY, (event : EventConfig<State, EntityData, null>) => void>>;
        keyup ?: Partial<Record<keyof typeof KEY, (event : EventConfig<State, EntityData, null>) => void>>;
        collision ?: Record<string, (event : CollisionEventConfig<State, EntityData>) => void>;
        update ?: (event : UpdateEventConfig<State, EntityData>) => void;
        custom ?: Record<string, (event : EventConfig<State, EntityData, unknown>) => void>;
    };
    velocity ?: {
        x ?: number;
        y ?: number;
    };
    draw : (event : DrawEventConfig<State, EntityData>) => void;
} & EntityData;

export type Entity<State> = TextConfig<State> | RectConfig<State>;

export type LayerConfig<State> = {
    entities : Entity<State>[];
};

export type SceneConfig<State> = {
    layers : LayerConfig<State>[];
};

export type GameConfig<State> = {
    debug ?: boolean;
    state : State;
    background : string;
    scene : string;
    scenes : Record<string, SceneConfig<State>>;
    findNode : (name : string) => EntityConfig<State, unknown> | null;
    trigger : (name : string, data ?: unknown) => void;
};

export type WithoutEntityFunctions<T> = Omit<T, "draw">;
export type WithoutGameFunctions<T> = Omit<T, "findNode" | "trigger">;

export const KEY = {
	w: "w",
	s: "s",
	ArrowUp: "ArrowUp",
	ArrowDown: "ArrowDown",
} as const;

export const COMPLEMENTS = {
	x: "width",
	y: "height",
} as const;

export const COORDINATES = ["x", "y"] as const;

export type Coordinate = typeof COORDINATES[number];