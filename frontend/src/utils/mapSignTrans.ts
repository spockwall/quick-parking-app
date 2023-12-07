export default function mapSignTrans(serial: number): string {
  switch (serial) {
    case 0: {
      return "";
    }
    case -1: {
      return "Enter";
    }
    case -2: {
      return "Exit";
    }
  }
  return "";
}