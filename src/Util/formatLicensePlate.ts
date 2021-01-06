function formatLicensePlate(licensePlate: string) {
  return licensePlate.toUpperCase().replace(/(\w{3})(\d{4})/, '$1-$2')
}

export default formatLicensePlate
