import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function getCabin(cabinId) {
  const { data, error } = await supabase.from("cabins").select("*").eq("id", cabinId)
    .single();;

  if (error) {
    console.error(error);
    throw new Error("Cabin details could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  // REMEMBER RLS POLICIES 
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

export async function createEditCabin(cabinDataToCreateOrUpdate, editId = null) {
  let cabinData, query, imageName;
  const isImageAdded = typeof cabinDataToCreateOrUpdate.image !== 'string';

  if (isImageAdded) {
    imageName = `${Math.random()}-${cabinDataToCreateOrUpdate.image.name}`.replaceAll('/', '');
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    cabinData = { ...cabinDataToCreateOrUpdate, image: imagePath };
  }
  else {
    cabinData = { ...cabinDataToCreateOrUpdate };
  }

  if (!editId) {
    query = supabase
      .from('cabins')
      .insert([
        { ...cabinData },
      ])
  } else {
    query = supabase
      .from('cabins')
      .update({ id: editId, ...cabinData })
      .eq('id', editId)
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  if (isImageAdded) {
    const id = editId || data.id;
    const { error: storageError } = await supabase
      .storage
      .from('cabin-images')
      .upload(imageName, cabinDataToCreateOrUpdate.image, {
        cacheControl: '3600',
        upsert: false
      });

    if (storageError) {
      console.error(storageError);
      await supabase.from("cabins").delete().eq("id", id);
      throw new Error('Cabin image could not be uploaded so cabin not created!');
    }
  }

  return data;
}

export async function checkAvailableCabins(startDate, endDate) {
  const { data: bookedCabins, error: bookedCabinsError } = await supabase
    .from('bookings')
    .select('cabinId')
    .in('status', ['unconfirmed', 'checked-in'])
    .gte('endDate', startDate)
    .lte('startDate', endDate);

  if (bookedCabinsError) {
    throw bookedCabinsError;
  }

  // Extract cabin IDs that are booked during the specified date range
  const bookedCabinIds = bookedCabins.map(booking => booking.cabinId) || [];

  let query = supabase
    .from('cabins')
    .select('*');

  // Step 2: Fetch cabins where ID is not in the list of booked cabin IDs
  if (bookedCabinIds.length > 0) {
    const bookedCabinIdsFormatted = `(${[...bookedCabinIds]})`;
    query = query.not('id', 'in', bookedCabinIdsFormatted);
  }

  const { data: availableCabins, error: availableCabinsError } = await query;

  if (availableCabinsError) {
    throw availableCabinsError;
  }

  // Return the available cabins
  return availableCabins;
}