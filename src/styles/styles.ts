import { StyleSheet } from "react-native";

const COLORS = {
  background: '#fffede',
  white: '#fff',
  black: '#000',
  green: '#28a745',
  red: '#dc3545',
  yellow: '#ffc107',
  grayLight: '#f0f0f0',
  grayDark: '#333',
};

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },
  botaoSelecionar: {
    width: '100%',
    minWidth: 100,
    height: 60,
    backgroundColor: COLORS.green,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    elevation: 4, // sombra android
    shadowColor: COLORS.black, // sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,

  },
  TextInputSelecionar: {
    width: '100%',
    minWidth: 150,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.grayDark,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 18,
    color: COLORS.black,
    marginVertical: 10,
  },

  TextInput: {
    width: '100%',
    minWidth: 300,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.grayDark,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 18,
    color: COLORS.black,
    marginVertical: 10,
  },
  texto_01: {
    fontSize: 28,
    fontWeight: '300',
    color: COLORS.black,
    marginBottom: 20,
    textAlign: 'center',
  },
  Texto_botao: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.white,
    textAlign: 'center',
  },
  botao_01: {
    width: '100%',
    minWidth: 300,
    height: 60,
    backgroundColor: COLORS.green,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    elevation: 4, // sombra android
    shadowColor: COLORS.black, // sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  click: {
    opacity: 0.5,
  },
  lista_01: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card_view: {
    width: '90%',
    minWidth: 300,
    maxWidth: 350,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    padding: 15,
    marginVertical: 10,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  card: {
    alignSelf: 'center',
  },
  botoes_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  botoes_card: {
    flex: 1,
    marginHorizontal: 5,
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botao_deletar: {
    backgroundColor: COLORS.red,
  },
  botao_alterar: {
    backgroundColor: COLORS.yellow,
  },
});

export { styles };
