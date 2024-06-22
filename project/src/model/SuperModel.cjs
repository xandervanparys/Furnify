const mongoose = require('mongoose');
const {Float} = require("@react-three/drei")
const contactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: false,
    },
    lastname: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        unique: true,
        required: false,
    },
    phone_number: {
        number: {
            type: String,
            required: false,
        },
        country: {
            type: String,
            required: false,
        },
    },
    address: {
        type: String,
        required: false,
    },
    postcode: {
        type: String,
        required: false,
    },
    country:{
        type: String,
        required: false,
    },
    city:{
        type: String,
        required: false,
    }
});

const dimensionsSchema = new mongoose.Schema({
    length: Number,
    width: Number,
    height: Number
});

// Define Functionalities schema
const functionalitiesSchema = new mongoose.Schema({
    bed: Boolean,
    sofa: Boolean,
    office_space: Boolean,
    storage_space: Boolean
});

const obstacleItemSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    width: {
        type: Number,
        default: 0
    },
    height: {
        type: Number,
        default: 0
    },
    depth: {
        type: Number,
        default: 0
    },
    id: {
        type: Number,
        required: true
    },
    opening_door: {
        type: String,
        default: "right"
    },
    obstacleWall: {
        type: String,
        default: "front"
    },
    doorXpos: {
        type: Number,
        default: 0
    },
    windowWall: {
        type: String,
        default: "front"
    },
    inside_window: {
        type: String,
        default: "no"
    },
    windowXpos: {
        type: Number,
        default: 0
    },
    windowYpos: {
        type: Number,
        default: 0
    },
    obstLength: {
        type: Number,
        default: 0
    },

    switchWall: {type: String, default: "front"},
    switchXpos: {type: Number, default: 0},
    switchYpos: {type: Number, default: 125},

    walloutletWall: {type: String, default: "front"},
    walloutletXpos: {type: Number, default: 0},
    walloutletYpos: {type: Number, default: 110},
});

// Define Obstacles schema
const obstaclesSchema = new mongoose.Schema({
    door: [obstacleItemSchema],
    window: [obstacleItemSchema],
    other: [obstacleItemSchema],
    walloutlet: [obstacleItemSchema],
    switch: [obstacleItemSchema],
    light: [obstacleItemSchema]
});

// Define Specs schema
const specsSchema = new mongoose.Schema({
    color: String,
    material: String,
    layout: String
});

// Define Varia schema
const variaSchema = new mongoose.Schema({
    requirements: String,
    mattress: String,
    room: String,
    size: String
});
const WidthOptionSchema = new mongoose.Schema({
    key: String,
    value: Number
});

const possible_modulesItemsSchema = new mongoose.Schema({
    bed: Boolean,
    sofa: Boolean,
    desk: Boolean,
    storage: Boolean,
    width_options: [WidthOptionSchema],
    components: [String],
    marge: Number,
    name: String,
    height: Number,
    width: Number,
    depth: Number,
    open: Number,
    closed: Number,
    saved: Number

})


const chosen_moduleSchema = new mongoose.Schema({
    name: String,
    height: Number,
    width: Number,
    depth: Number,
    open: Number,
    closed: Number,
    saved: Number,
    bed: Boolean,
    sofa: Boolean,
    desk: Boolean,
    storage: Boolean,
    marge: Number,
    width_options: [WidthOptionSchema],
    components: [String]
});

const errorsSchema = new mongoose.Schema({
    softer: Boolean,
    demands: Boolean,
    roomSize: Boolean,
    points2D: Boolean
});




// Combine all schemas into one main schema
const superSchema = new mongoose.Schema({
    contact: contactSchema,
    dimensions: dimensionsSchema,
    functionalities: functionalitiesSchema,
    obstacles: obstaclesSchema,
    specs: specsSchema,
    varia: variaSchema,
    rectangular: Boolean,
    skyboxPath: String,
    possible_modules: [possible_modulesItemsSchema],
    chosen_module: chosen_moduleSchema,
    rotationIndex: Number,
    errors: errorsSchema,
    selectedWall: String,
    modelPosition: [Number],
    positions: {
        type: Map,
        of: [Number]
    },
    rotationIndex: Number
});

const SuperModel = mongoose.model('SuperModel', superSchema);


module.exports = SuperModel;
