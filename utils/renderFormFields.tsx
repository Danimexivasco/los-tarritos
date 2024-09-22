import Input from "@/components/input";
import Select from "@/components/select"
import TextArea from "@/components/textarea"


export const renderFormFields = (inputs: any, formData: any, handleChange: any) => {
  if (!inputs) return null
  return (
    inputs?.map((input: any) => {
      if (input.type === "textarea") {
        return <TextArea
          key={input.label}
          value={formData[ input.name ] as string}
          onChange={handleChange}
          {...input}
        />
      }
      if (input.type === "select") {
        return <Select
          key={input.label}
          value={formData[ input.name ] as string}
          onChange={handleChange}
          options={input.options ?? []}
          {...input} />
      }
      return <Input
        key={input.label}
        value={formData[ input.name ] as string}
        onChange={handleChange}
        {...input}
      />
    })
  )

}