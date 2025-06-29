// app/api/projects/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import ProjectModel from '@/model/Project'; // Assuming this is your Project model path

export async function POST(request: Request) {
  try {
    // Connect to database
    await dbConnect();

    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.description || !body.tags || !body.imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check for existing project with same title
    const existingProject = await ProjectModel.findOne({ title: body.title });
    if (existingProject) {
      return NextResponse.json(
        { success: false, error: 'Project with this title already exists' },
        { status: 409 }
      );
    }

    // Create new project
    const project = await ProjectModel.create({
      title: body.title,
      description: body.description,
      tags: body.tags,
      imageUrl: body.imageUrl,
      // Add any optional fields with defaults here
      createdAt: body.createdAt || new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json(
      { success: true, data: project },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    
    // Fetch all projects, sorted by creation date (newest first)
    const projects = await ProjectModel.find().sort({ createdAt: -1 });
    
    return NextResponse.json(
      { success: true, data: projects },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}