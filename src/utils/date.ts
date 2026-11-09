export function calculateAge(birthDate: Date, today = new Date()): number {
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export function latestAdultBirthDate(today = new Date()): Date {
  return new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
}
