import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  console.log('deleteCabin id', id);

  // REMEMBER RLS POLICIES 
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from('cabins')
    .insert([
      { ...newCabin, image: imagePath },
    ])
    .select();
  console.log('obj', data[0]);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  const { error: storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  if (storageError) {
    console.error(storageError);
    await supabase.from("cabins").delete().eq("id", data[0].id);
    throw new Error('Cabin image could not be uploaded so cabin not created!');
  }

  return data;
}
