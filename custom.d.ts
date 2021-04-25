// configuração para que qualquer arquivo .png seja reconhecido pelo TS
declare module "*.png" {
  const content: any;
  export default content;
}
declare module "*.jpeg" {
  const content: any;
  export default content;
}
