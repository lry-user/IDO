import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const errorData = await request.json()
    
    // Log the error on the server
    console.error('Client-side error:', errorData)
    
    // You could also save to a database or send to a logging service here
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error logging failed:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
} 