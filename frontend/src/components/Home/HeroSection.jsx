import womanImage from '../../assets/womanHeroSectionHome.svg'
import ratingImage from '../../assets/ratingHeroHomeSection.svg'

const HeroSection = () => {
  return (
    <div className='grid grid-cols-2 mt-10 items-center'>
      <section className="text-left bg-white py-12 px-4">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Mulheres<br/> Empoderadas,<br/> aprenda a alcançar sua liberdade financeira
        </h1>
        <p className="text-gray-600 mb-6">
          Pronto para abraçar a mudança e o empoderamento? <br/>Faça parte de uma comunidade dedicada ao seu crescimento.
        </p>
        <div className="flex  items-center mt-6">
          <button className="bg-pink-500 text-white font-bold py-3 px-7 rounded hover:bg-pink-600 transition duration-300">
            Cadastre-se
          </button>
          <div className='ml-8'>
            <img src={ratingImage} alt="Rating" className="" />
          </div>
        </div>
      </section>
      <section className="text-center bg-white py-12 px-4">
        <img src={womanImage} alt="woman on couch" height='2px' />
      </section>
    </div>
  );
};

export default HeroSection;
