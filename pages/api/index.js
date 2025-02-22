export async function POST(request) {  
    console.log(request.body)
    return Response.json(request.body)
}


export async function GET(request) {
    const data = { message: "Hello, world!" };
    return Response.json(data);
}


export default function handler(req, res) {
    res.status(200).json({ message: 'Hello from Next.js!' })
  }