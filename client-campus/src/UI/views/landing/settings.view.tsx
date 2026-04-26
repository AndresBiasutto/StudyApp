import Content from "../../components/molecules/content.molecule";
import H2 from "../../components/atoms/h2.atom";
import Ptxt from "../../components/atoms/P.atom";
import SettingsForm from "../../components/organisms/forms/settingsForm.organism";

const Settings = () => {
  return (
    <Content title="Configuración">
      <div className="flex w-full max-w-2xl flex-col items-center justify-center rounded bg-lightSecondary p-6 dark:bg-darkSecondary">
        <H2 text="Mi perfil" />
        <Ptxt
          text="Editá tus datos personales y dejá listo el envío al endpoint /users/me."
          aditionalStyle="mb-4 text-center"
        />
        <SettingsForm />
      </div>
    </Content>
  );
};

export default Settings;
