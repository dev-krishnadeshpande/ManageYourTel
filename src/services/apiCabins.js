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

export async function createEditCabin(newCabin) {
  // console.log('newCabin', newCabin);
  // console.log('editId', editId);
  console.log('newCabin', newCabin);


  let imageName, imagePath;
  let returnedData, returnedError, returnedStorageError;

  if (!newCabin.editId) {
    imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    const { data, error } = await supabase
      .from('cabins')
      .insert([
        { ...newCabin, image: imagePath },
      ])
      .select()
      .single();

    const { error: storageError } = await supabase
      .storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);

    returnedData = data;
    returnedError = error;
    returnedStorageError = storageError;
  } else {
    const { editId, ...updatedCabin } = newCabin;
    console.log('updatedCabin', updatedCabin);

    const { data, error } = await supabase
      .from('cabins')
      .update({ ...updatedCabin })
      .eq('id', editId)
      .select()
      .single()

    returnedData = data;
    returnedError = error;
  }


  if (returnedError) {
    console.error(returnedError);
    throw new Error("Cabin could not be created");
  }

  if (returnedStorageError) {
    console.error(returnedStorageError);
    await supabase.from("cabins").delete().eq("id", returnedData[0].id);
    throw new Error('Cabin image could not be uploaded so cabin not created!');
  }

  return returnedData;
}
