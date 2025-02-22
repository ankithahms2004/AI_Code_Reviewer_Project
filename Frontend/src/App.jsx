import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'
import { Loader,LoaderCircle } from 'lucide-react';

function App() {
  const [ count, setCount ] = useState(0)
  const [loading, setLoading] = useState(false)
  const [ code, setCode ] = useState(`//Enter Your Code here to get reviewed:  
  function sum() {
  return 1 + 1
}`)

  const [ review, setReview ] = useState(`Get your Reviewed Code result by AI here:`)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setLoading(true)
    const response = await axios.post('https://ai-code-reviewer-project.onrender.com/ai/get-review', { code })
    setReview(response.data)
    setLoading(false)
  }

  return (
    <>
      <main>
        <div className="left">     
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          {loading?
        <><button className='review'><div><LoaderCircle className='animate-spin'/>Reviewing Code...</div></button></>:<><button className='review' onClick={reviewCode}><div 
              
              >Review</div></button></>}
          </div>
              {/* <div onClick={reviewCode} className='review'>
           <Button disabled={loading}>
            
            {loading?<><LoaderCircle className="animate-spin"/>Reviewing Code...</>:"Review"}
          </Button>
          </div> */}
           
           
           
        <div className="right">
          <Markdown

            rehypePlugins={[ rehypeHighlight ]}

          >{review}</Markdown>
        </div>
      </main>
      
    </>
  )
}



export default App
