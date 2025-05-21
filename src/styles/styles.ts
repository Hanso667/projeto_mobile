import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    tela: {
        flex: 1, 
        justifyContent: "center",
        backgroundColor: '#fffede',
    },
    TextInput: {
        width: '80%',
        backgroundColor: 'white',
        borderWidth: 2,
    },
    texto_01: {
        fontSize: 32,
        fontWeight: '300',
        color: 'black',
    },
    Texto_botao: {
        marginTop: -6,
        fontSize: 32,
        fontWeight: '600',
        color: 'white',
    },
    botao_01: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%',
        height: 75,
        backgroundColor: 'green',
        borderRadius: 15,
    },
    click: {
        opacity: 0.5
    },
    lista_01: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center'
    },
    card_view: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 15,
        borderWidth: 1

    },
    card: {
        alignSelf: 'center',
    },
    botoes_view: {
        width: 300,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: 15

    },
    botoes_card: {
        width: 150,

    },
    botao_deletar: {
        backgroundColor: 'red',
        height: '83%',
        width: '45%',
        alignItems: 'center',
        borderRadius: 5

    },
    botao_alterar: {
        backgroundColor: 'yellow',
        height: '83%',
        width: '45%',
        alignItems: 'center',
        borderRadius: 5

    },

});

export { styles };