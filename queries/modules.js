import { Module } from "@/model/module.model"

export const create = async (moduleData) => {
try {
    const createdModule = await Module.create(moduleData);
    return JSON.parse(JSON.stringify(createdModule))

} catch (error) {
    throw new Error(error)
}
}