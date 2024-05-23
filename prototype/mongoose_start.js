const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    //, photo: file
});

const SubscriptionSchema = new mongoose.Schema({
    level: {
        type: String,
        enum: ["Explorer", "Pioneer", "Navigator", "Voyager", "Enterprize"],
    }, 
    price: Number,
    comment: String, // for custom Enterprize
    start: Date,
    end: Date
});

const OrganizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    users: [UserSchema],
    payment: [{
        paymentMethod: {
            type: String,
            enum: ["PayPal", "Credit Card", "Invoice"],
            required: true
        },
        paymentDetails: String
    }],
    subscription: SubscriptionSchema
    //, logo: file
});

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdBy: UserSchema,
    status: {
        type: String,
        enum: ["Design", "Testing", "Deployed", "Done"],
        required: true
    },
    deadline: {
        type: Date,
        required: true
    }, 
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium",
        required: true
    }, 
    permissions: [{user: UserSchema, 
                   level: {
                        type: String,
                        enum: ["Owner", "Editor", "Reader"],
                        required: true
                   }
                  }]
});

const ElicitationSchema = mongoose.Schema({
    project: ProjectSchema,
    title: {
        type: String,
        required: true
    },
    freeText: String,
    //createdBy: UserSchema, // not supposed to be created - there by default
    updatedBy: UserSchema
    //, file: file
});

const SpecificationSchema = mongoose.Schema({
    project: ProjectSchema,
    title: {
        type: String,
        required: true
    },
    description: String,
    createdBy: UserSchema,
    updatedBy: UserSchema,
    pinned: {
        type: Boolean,
        required: true,
        default: true
    }
    // deleted? - for Version Control
    //, file: file
});

const ModelingSchema = mongoose.Schema({
    project: ProjectSchema,
    title: {
        type: String,
        required: true
    },
    description: String,
    createdBy: UserSchema,
    updatedBy: UserSchema,
    type: {
        type: String,
        enum: ["Class", "Use Case"],
        required: true
    },
    pinned: {
        type: Boolean,
        required: true,
        default: true
    }
    // deleted? - for Version Control
    //, file: file
});

const NFRSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    createdBy: UserSchema,
    updatedBy: UserSchema,
    type: {
        type: String,
        enum: ["Security", "Performance", "Availability"],
        required: true
    },
    pinned: {
        type: Boolean,
        required: true,
        default: true
    }
    //, deleted? - for Version Control
});

// payments
const PaymentSchema = new mongoose.Schema({
    organization: OrganizationSchema,
    subscription: SubscriptionSchema,
    receivedOn: Date
});

// notifications: changes in projects, tags, changes in user management 
// each in each own file: under folder "models"

