export interface sliderSetting{
    next: slideContr
    prev: slideContr
}

export interface slideContr{
    z_index?: number;
    transition?: string;
    opasity?: number;
}
export interface dragSet{
    offsetX: any;
    pageY?: number;
}

export interface initPositions{
    left: number;
    right: number;
}