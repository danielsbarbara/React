import multer from "multer";

export async function uploadSubmissionFile(req, res) {
  //Definições do multer, podes definir tamanhos máximos dos ficheiros, se queres guardar mais ficheiros, onde ficam guardados e outras coisas
  const upload = multer({
    storage: multer.diskStorage({
      destination: 'images/',
      filename: (req, file, callback) => {
        console.log(file)
        callback(null, file.originalname);
    }
    })
  })

  //Criamos um middleware
  // const multerSingle = initMiddleware(upload.single())
  //executamos o middleware
  // await multerSingle(req, res)
  await upload.any()
  return `images/${req.files[0].filename}`
}

//Função que recebe uma função e a transforma num middleware a espera de ser executado
export function initMiddleware(middleware) {
  return (req, res) =>
      new Promise((resolve, reject) => {
          middleware(req, res, (result) => {
              if (result instanceof Error) {
                  return reject(result);
              }
              return resolve(result);
          });
      });
}

//Dizer ao next para não ler o req.body como JSON
export const config = {
  api: {
    bodyParser: false,
  },
};