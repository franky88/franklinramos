import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  clerkUserId: string;
  email: string;
  name?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    clerkUserId: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    name: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true } // Auto-creates createdAt & updatedAt fields
);

interface ICategory extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

interface IPortfolio extends Document {
  title: string;
  description: string;
  url?: string;
  imageUrl?: string;
  categoryId?: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const PortfolioSchema = new Schema<IPortfolio>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String },
    imageUrl: { type: String },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: { createdAt: true, updatedAt: false } } // createdAt only
);

interface IExperience extends Document {
  position: string;
  company: string;
  description: string;
  isWithLine: boolean;
  startDate: Date;
  endDate?: Date;
  userId?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    position: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String, required: true },
    isWithLine: { type: Boolean, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

interface ISkill extends Document {
  name: string;
  application: string;
  from: Date;
  to: Date;
  mastery: number;
  userId?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true },
    application: { type: String, required: true },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    mastery: { type: Number, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// Export models
export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export const Category = mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);
export const Portfolio = mongoose.models.Portfolio || mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);
export const Experience = mongoose.models.Experience || mongoose.model<IExperience>("Experience", ExperienceSchema);
export const Skill = mongoose.models.Skill || mongoose.model<ISkill>("Skill", SkillSchema);
