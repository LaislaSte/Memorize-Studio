import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import './InputImg.css';

interface IInputImg {
  className: string;
  setImage: () => {};
  //vai receber a url setada em image
  imgPreview: string;
  //para mudar o estilo do preview
  imgPreviewClassName: string;
  //recebe a referencia de um elemento diferente para abrir o input por outro elemento
  onSetReference: () => {};
}

//o atributo accept do input restringe a recepção do arquivo à apenas imagens (de todas extensõe)
const InputImg: React.FC<IInputImg> = ({
  className = '',
  //o setImage vai receber uma fun do componente pai
  setImage,
  //vai receber a url setada em image
  imgPreview,
  //para mudar o estilo do preview
  imgPreviewClassName = '',
  //recebe a referencia de um elemento diferente para abrir o input por outro elemento
  onSetReference,
}) => {
  //quando clicar na div, seria como clicar no input. O input vai, atravez do atributo ref, preencheer a referencia dele mesmo dentro deste hook do react abaixo
  const refInput = useRef(null);

  useEffect(() => {
    if (!onSetReference) {
      return;
    }
    onSetReference(refInput?.current);
  }, [refInput?.current]);

  //para quando clicar no elemento div, abrir o seletor de arquivos
  //simula um click no input atual que está referenciado
  const showSelector = () => {
    refInput?.current?.click();
  };

  //quando meu componente for alterado a função para setar a imagem será chamado
  const onImageChanged = () => {
    console.log('ao mudar imagem');

    //verificar se tem algum arquivo selecionado ao selecionar uma imagem
    //se nao tiver na referencia do input algo selecionado no primeiro indice do array retorne nada
    //propriedade files exclusida do input tipo file que contem os arquivos selecionados para aquele input, ele é um array e possui a propriedade length
    if (!refInput?.current?.files?.length) {
      return;
    }

    //se nao, pegar o primeiro arquivo selecionado pelo input e atribuir a var file
    const file = refInput?.current?.files?.[0];

    //para exibir a imagem numa pré visualização. Para isso usa se um metodo readDaraURL da classe global FileReader que le um arquivo e retorna a url deste arquivo.
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    //este metodo é assincrono, entao, apenas quando ele terminar de ler o arquivo a imagem será setada como um objt que irá conter o a url e o arquivo (onloadend - ao fim do caregamento)
    fileReader.onloadend = () => {
      setImage({
        preview: fileReader.result,
        file,
      });
    };
  };

  return (
    <div className={`input-img-container`} onClick={showSelector}>
      {
        //esta condição dira que se a url da img existir (se a props for passada e a primeira expressão for true, então, retorne uma div com o elemento img setando seu src com a url da imagem)
        imgPreview && (
          <div className={className}>
            <img
              src={imgPreview}
              alt="pré visualização da imagem"
              className={imgPreviewClassName}
            />
          </div>
        )
      }
      <input
        type="file"
        className="hided"
        accept="image/*"
        ref={refInput}
        onChange={onImageChanged}
      />
    </div>
  );
};

export default InputImg;
