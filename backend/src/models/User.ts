import mongoose from 'mongoose';


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },

        email: {
            type: String,
            required: false,
            index: {
                unique: true
            }
        },
        phone: {
            type: String,
            required: false
        },
        address: {
            type: String,
            required: false
        },
        cpf: {
            type: String,
            required: false,
            index: {
                unique: true
            }
        },
        
    },
    {
        timestamps: true
    }
)

export default mongoose.model('users', userSchema);