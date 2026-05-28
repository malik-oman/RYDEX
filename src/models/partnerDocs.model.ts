import mongoose from "mongoose";



interface IPartnerDocs {
  owner: mongoose.Types.ObjectId;
  cnicUrl:string,
  rcUrl:string,
  licenseUrl:string
  status: "approved" | "pending" | "rejected";
  rejectionReason?: string;

  createdAt: Date;
  updatedAt: Date;
}

const partnerDocsSchema = new mongoose.Schema<IPartnerDocs>(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
     cnicUrl:String,
  rcUrl:String,
  licenseUrl:String,
 
  status:{
    type:String,
    enum:["approved" , "rejected" , "pending"],
    default:"pending"
  },
  rejectionReason: String,

  },
  { timestamps: true },
);


const PartnerDocs = mongoose.models.PartnerDocs || mongoose.model("PartnerDocs", partnerDocsSchema)

export default PartnerDocs