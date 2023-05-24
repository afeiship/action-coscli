interface NxStatic {
  $set: (inKey: any, inValue?: any) => void;
  $get: (inKey?: string, inDefault?: any) => any;
  $app: any;
  $pinia: any;
}
