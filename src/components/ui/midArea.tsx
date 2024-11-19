'use client'

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "react-toastify"
import Spinner from "@/app/spinner"
import { useDropzone } from 'react-dropzone'
import { X } from 'lucide-react'

interface MidAreaProps {
  onResponse: (data: any) => void;
  onSendEssay: (essay: string) => void;
}

export default function MidArea({ onResponse, onSendEssay }: MidAreaProps) {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [pdfFile, setPdfFile] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file && file.type === 'application/pdf') {
      setPdfFile(file)
      setText("") // Limpiar el texto cuando se sube un PDF
      toast.success(`Archivo PDF "${file.name}" cargado correctamente`)
    } else {
      toast.error('Por favor, arrastra solo archivos PDF')
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false,
    noClick: true,
    noKeyboard: true
  })

  const handleClick = async () => {
    const JWT = localStorage.getItem("JWT")
    setLoading(true)
    onSendEssay(text || pdfFile?.name || ''); // Iniciar la animación del avatar

    try {
      let body: any
      let headers: HeadersInit = {
        Authorization: `Bearer ${JWT}`,
      }
      let endpoint: string

      if (pdfFile) {
        endpoint = `http://127.0.0.1:5000/file`
        const reader = new FileReader()
        const base64Content = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(pdfFile)
        })
        body = JSON.stringify({
          file: base64Content.split(',')[1],
          filename: pdfFile.name,
        })
        headers['Content-Type'] = 'application/json'
      } else {
        endpoint = `http://127.0.0.1:5000/texto`
        body = JSON.stringify({ text })
        headers['Content-Type'] = 'application/json'
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body,
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log("Datos enviados exitosamente", responseData)
        onResponse(responseData)
        toast.success(pdfFile ? "PDF enviado con éxito" : "Ensayo enviado con éxito")
      } else {
        const errorMessage = await response.text()
        console.error("Error al enviar los datos", response.statusText, errorMessage)
        toast.error(`Error: ${errorMessage || response.statusText}`)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al enviar los datos:", error.message)
        toast.error(`Error: ${error.message}`)
      } else {
        console.error("Error desconocido", error)
        toast.error("Error desconocido")
      }
    } finally {
      setLoading(false)
      setText("")
      setPdfFile(null)
    }
  }

  const removePdf = () => {
    setPdfFile(null)
    toast.info("Archivo PDF removido")
  }

  return (
    <div className="grid w-full h-[calc(100%-70px)] gap-7">
      <div 
        {...getRootProps()} 
        className={`shadow-md rounded-lg p-4 border-2 border-dashed ${
          isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <Textarea
          placeholder={isDragActive ? "Suelta el archivo PDF aquí" : "Escribe aquí tu ensayo o arrastra un archivo PDF"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[100px] max-h-[100px] resize-none"
          disabled={!!pdfFile}
        />
        {pdfFile && (
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Archivo cargado: {pdfFile.name}
            </p>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                removePdf()
              }}
              aria-label="Remover PDF"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <div className="mx-auto flex gap-4">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Button onClick={handleClick} disabled={loading || (!text && !pdfFile)}>
              Enviar {pdfFile ? 'PDF' : 'ensayo'}
            </Button>
            <Button onClick={open} variant="outline" disabled={loading || !!pdfFile}>
              Seleccionar PDF
            </Button>
          </>
        )}
      </div>
    </div>
  )
}