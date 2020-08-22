export default async () => {
  try {
    const allAttractions = await fetch("/api");
    return await allAttractions.json();
  } catch (err) {
    console.log(err);
  }
};
