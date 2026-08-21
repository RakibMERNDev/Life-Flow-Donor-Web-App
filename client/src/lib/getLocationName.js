export const getDistrictName = (districtId, districts) => {
  return districts.find((d) => d.id === districtId)?.name || districtId;
};

export const getUpazilaName = (upazilaId, upazilas) => {
  return upazilas.find((u) => u.id === upazilaId)?.name || upazilaId;
};
