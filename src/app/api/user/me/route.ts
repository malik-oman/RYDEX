import connectDb from "@/lib/db";

export async function GET(req:Request) {
  try {
    await connectDb()
    
  } catch (error) {
    
  }
}