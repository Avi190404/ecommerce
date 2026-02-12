"use client"

import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";

export default function ProductForm() {
    const { register, handleSubmit, reset } = useForm();

    const onSave = (data: any) => {
        const productDetails = {...data}
        console.log(productDetails)
    }
  return (
    <form onSubmit={handleSubmit(onSave)} className="max-w-4xl space-y-8 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
      <FieldGroup className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field className="md:col-span-2">
            <FieldLabel className="text-xs font-bold uppercase text-slate-500">Product Name</FieldLabel>
            <Input placeholder="e.g. MacBook Pro M3" className="mt-1" {...register("name")}/>
          </Field>

          <Field className="md:col-span-2">
            <FieldLabel className="text-xs font-bold uppercase text-slate-500" >Description</FieldLabel>
            <Textarea 
              placeholder="Provide a detailed description of the product..." 
              className="mt-1 min-h-[120px] resize-none"
              {...register("description")}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Field>
            <FieldLabel className="text-xs font-bold uppercase text-slate-500">Category</FieldLabel>
            <Input placeholder="e.g. Electronics" className="mt-1"  {...register("category")}/>
          </Field>

          <Field>
            <FieldLabel className="text-xs font-bold uppercase text-slate-500">Price (INR)</FieldLabel>
            <Input type="number" placeholder="0.00" className="mt-1" {...register("price")}/>
          </Field>

          <Field>
            <FieldLabel className="text-xs font-bold uppercase text-slate-500">Stock</FieldLabel>
            <Input type="number" placeholder="0" className="mt-1" {...register("stock")}/>
          </Field>
        </div>
      </FieldGroup>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
        <Button variant="outline" type="button" className="rounded-lg" onClick={() => { reset();}}>
          Discard
        </Button>
        <Button type="submit" className="bg-black text-white hover:bg-slate-800 rounded-lg px-8">
          Save Product
        </Button>
      </div>
    </form>
  );
}