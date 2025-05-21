import { StyleSheet } from "react-native";

//o StyleSheet é a folha de estilo, equivalente ao css
const styles = StyleSheet.create({

    lista: {
        marginTop: 20,
        gap: 10
    },
    card_view: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-evenly",
        alignItems: 'center',
    },
    card: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-evenly",
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'white'
    },
    botoes_view: {
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'center',
    },
    botoes_card: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'center',
    },
    texto_botao_card: {
        fontSize: 20
    },
    botao_deletar: {
        width: '50%',
        backgroundColor: 'red'
    },
    botao_alterar: {
        width: '50%',
        backgroundColor: 'yellow'
    },

    botao: {
        alignSelf: 'center',
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        width: "85%",
        height: 65,
        justifyContent: "space-evenly",
        backgroundColor: 'green',
        borderRadius: 10,
    },
    botao_cinza: {
        alignSelf: 'center',
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        width: "85%",
        height: 65,
        justifyContent: "space-evenly",
        backgroundColor: 'grey',
        borderRadius: 10,
    },
    botao_image: {
        width: 40,
        height: 40,
    },
    tela_principal: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff7c4",
        gap: 10
    },
    tela_Lista: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff7c4",
    },
    tela_Add: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff7c4",
        gap: 7,
    },
    textInput: {
        width: "90%",
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
    },
    texto_1: {
        fontSize: 24,
        width: "90%",
        alignSelf: 'center',
        textAlign: 'left',
        color: 'black'
    },
    texto_botao: {
        fontSize: 30,
        color: 'white'
    },
    click: {
        opacity: 0.5
    },
});

export { styles };