export type Rect = {
    x : number;
    y : number;
    width : number;
    height : number;
};

export type KeyEventConfig = {
    name : "keydown" | "keyup";
    key : KeyValues;
};

export type InputEventConfig = KeyEventConfig;

export type Output = {
    setFill(fill : string) : void;
    fillRect(x : number, y : number, width : number, height : number) : void;
    getWidth() : number;
    getHeight() : number;
    save() : void;
    scale(x : number, y : number) : void;
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
    setDash(dash : Array<number>) : void;
    strokeRect(x : number, y : number, width : number, height : number) : void;
    clear(color : string) : void;
    drawImage(
        name : string, 
        column : number,
        row : number,
        rows : number,
        columns : number,
        dx : number, 
        dy : number, 
        dw : number, 
        dh : number,
    ) : void;
    loadImage(name : string, url : string) : Promise<void>;
    loadAudio(name : string, url : string) : Promise<void>;
    play(config : { name : string; loop : boolean; id : string; }) : void;
    stop(config : { name : string; id : string; }) : void;
};

export type Alignment = "left" | "center" | "right";

export type Baseline = "top" | "middle" | "bottom";

export type AudioPlayConfig = {
    name : string;
    loop ?: boolean;
    id : (event : UpdateEventConfig<unknown, unknown>) => string;
};

export type AudioStopConfig = {
    name : string;
    id : (event : UpdateEventConfig<unknown, unknown>) => string;
};

export type EventConfig<EventData, State, Data> = {
    entity : Entity<State, Data>;
    data : EventData;
    game : GameConfig<State>;
    output : Output;
    layer : LayerConfig;
};

export type DrawEventConfig<State, Data> = EventConfig<null, State, Data>;

export type RecursivePartial<T> = {
    [P in keyof T] ?:
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        T[P] extends (...args : any[]) => any ? T[P]:
      T[P] extends Array<infer U> ? Array<RecursivePartial<U>>:
      T[P] extends object ? RecursivePartial<T[P]>:
      T[P];
  };

export type CollisionEventConfig<State, Data> = EventConfig<{
    other : Entity<State, Data>;
    coordinate : Coordinate;
    collision : {
        self : Rect;
        other : Rect;
        overlap : Rect;
    };
}, State, Data>;

export type UpdateEventConfig<State, Data> = EventConfig<{
    delta : number;
    coordinate : Coordinate;
}, State, Data>;

export type DefaultData = {
    isOnWall : boolean;
    isOnGround : boolean;
    keys : Record<string, boolean>;
};

export type Entity<State, Data> = {
    id : string;
    data : Data & DefaultData;
    // TEXT
    text : string;
    align : Alignment;
    baseline : Baseline;
    // IMAGE
    src : {
        name : string;
        column : number;
        row : number;
        columns : number;
        rows : number;
    };
    flip : {
        x : boolean;
        y : boolean;
    };
    animation : {
        name : string;
        progress : number;
        previous : string;
    };
    // BASE
    fill : string;
    x : number;
    y : number;
    width : number;
    height : number;
    anchor : {
        x : number;
        y : number;
    };    
    name : string;
    velocity : {
        x : number;
        y : number;
    };
    draw : (event : DrawEventConfig<State, Data>) => void;
    update : (event : UpdateEventConfig<State, Data>) => void;
    events : Partial<Record<string, null | ((event : EventConfig<unknown, State, Data>) => void)>>;
};

export type LayerConfig = {
    entities : Array<Entity<unknown, unknown>>;
};

export type SceneConfig = {
    layers : Array<LayerConfig>;
};

export type GameConfig<State> = {
    state : State;
    debug : boolean;
    keys : Partial<Record<KeyValues, boolean>>;
    images : Partial<Record<string, string>>;
    audio : Partial<Record<string, string>>;
    background : string;
    scene : string;
    scenes : Partial<Record<string, SceneConfig>>;
    findNode : (name : string) => Entity<unknown, unknown> | null;
    trigger : (name : string, data ?: unknown) => void;
};

export const KEY = {
	W: "w",
	S: "s",
	ArrowUp: "ArrowUp",
	ArrowRight: "ArrowRight",
	ArrowDown: "ArrowDown",
	ArrowLeft: "ArrowLeft",
	Space: " ",
} as const;

export type KeyKeys = keyof typeof KEY;

export type KeyValues = typeof KEY[KeyKeys];

export const COMPLEMENTS = {
	x: "width",
	y: "height",
} as const;

export const COORDINATES = ["x", "y"] as const;

export type Coordinate = typeof COORDINATES[number];

export type AnimationAnimations = Record<string, {
	fps : number;
    frames : Array<{
        column : number;
        row : number;
    }>;
}>;

export type AnimationConfig<T extends AnimationAnimations> = {
    name : string;
    columns : number;
    rows : number;
    animations : T;
};

export type AnimationHandler<T> = (
    (event : EventConfig<unknown, unknown, unknown>) => void
) & {
    [K in keyof T] : (event : EventConfig<unknown, unknown, unknown>) => void;
};