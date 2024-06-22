export class Module {
    private name: string;
    private height: number;
    private width: number;
    private depth: number;
    private open: number;
    private closed: number;
    private saved: number;
    private bed: boolean = false;
    private sofa: boolean = false;
    private desk: boolean = false;
    private storage: boolean = false;
    private width_options: { key: string, value: number; }[] = [];
    private components: string[] = [];
    private marge:number;

    constructor(mod: any, marge:number = 0.03) {
        this.marge = marge;
        this.name = mod.naam;
        this.height = +mod.hoogte / 1000;
        this.depth = +mod.diepte / 1000;
        this.open = +mod.open / 1000;
        this.closed = +mod.dicht / 1000;
        this.saved = +mod.besparing;

        if (mod.zetel == 'true') {
            this.sofa = true;
        }

        if (mod.opkladbed == 'true' || mod.bed_bewegend == 'true') {
            this.bed = true;
        }

        if (mod.kast_met_zijschappen == 'true' || mod.kast == 'true' ||
            mod.kast_bewegend == 'true' || mod.tweede_kast_bewegend == 'true') {
            this.storage = true;
        }
        if (mod.bureau == 'true' || mod.bureau_bewegend == 'true') {
            this.desk = true;
        }

        this.width_options.push({ key: "140", value: +mod.breedte140 / 1000 })
        this.width = +mod.breedte140 / 1000 // the default is the smallest value
        this.width_options.push({ key: "160", value: +mod.breedte160 / 1000 })
        this.width_options.push({ key: "180", value: +mod.breedte180 / 1000 })

        if (typeof mod == 'object' && mod != null) {
            Object.entries(mod).forEach(([key, value]) => {
                if (value == 'true') {
                    this.components.push(key);
                }
            });
        }
    }

    public getname(): string {
        return this.name;
    }
    public getheight(): number {
        return this.height;
    }
    public getdepth(): number {
        return this.depth;
    }
    public getopen(): number {
        return this.open;
    }
    public getclosed(): number {
        return this.closed;
    }
    public getsaved(): number {
        return this.saved;
    }
    public getwidth(): number {
        return this.width
    }

    public getcomponents(): string[] {
        return this.components
    }
    public getwidth_options():{ key: string; value: number }[]{
        return this.width_options;
    }
    /**
    * set the correct width
    * @param {string} size
    */
    public set_width_options(size: string) {
        if (size == "140" || size == "160" || size == "180") {
            const option = this.width_options.find(option => option.key == size);
            if (option) {
                this.width = option.value;
            }
        }
    }

    /**
    * Sees if the module contains these types
    * @param {boolean} bed
    * @param {boolean} desk
    * @param {boolean} sofa
    * @param {boolean} storage
    * @return {boolean} type
    */
    public type(bed: boolean, desk: boolean, sofa: boolean, storage: boolean) {
        return (this.bed == bed && this.desk == desk && this.sofa == sofa && this.storage == storage)
    }

    /**
    * Sees if the module contains the types if one can differ
    * @param {boolean} bed
    * @param {boolean} desk
    * @param {boolean} sofa
    * @param {boolean} storage
    * @return {boolean} softer type
    */
    public softer_type(bed: boolean, desk: boolean, sofa: boolean, storage: boolean) {
        return ((this.bed == bed && this.desk == desk && this.sofa == sofa) ||
            (this.bed == bed && this.desk == desk && this.storage == storage) ||
            (this.bed == bed && this.sofa == sofa && this.storage == storage) ||
            (this.desk == desk && this.sofa == sofa && this.storage == storage))
    }

    /**
    * Sees if the module would fit in the room if room is rectangle
    * @param {number} height in meters
    * @param {number} length in meters
    * @param {number} width in meters
    * @return {boolean} possible fit
    */
    public correct_size(height: number, length: number, width: number) {
        if(this.components.length >= 2)
            return (this.height < height && ((this.width < width && (this.open + this.marge)< length) ||(this.width < length && (this.open + this.marge) < width)))
        return (this.height < height) && (((this.width + this.marge)< width && this.open < length) || ((this.width + this.marge) < length && this.open < width));
    }

    /**
    * Sees if the module would fit in the room if room is other
    * @param {number} side meters
    * @param {number} height meters
    * @return {boolean} possible fit
    */
    public correct_side(side: number,height: number) {
        if(this.components.length >= 2)
            return ((this.height < height ) && (((this.open + this.marge) < side)||(this.width < side)))
        return ((this.height < height )&& ((this.open < side)||((this.width + this.marge) < side)))
    }


}
