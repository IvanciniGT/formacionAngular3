import java.util.function.*;

public class Programa {

    public static void main(String[] args){
        
        Function<Integer, Integer> miFuncion = Programa::doble;
        System.out.println( miFuncion.apply(5));
        imprimirResultadoDeOperacion( miFuncion, 10);

        imprimirResultadoDeOperacion( numero -> numero * 4, 10);

    }

    public static int doble(int numero) {
        return numero * 2;
    }
    public static void imprimirResultadoDeOperacion(Function<Integer, Integer> operacion, int numero) {
        System.out.println( operacion.apply(numero));
    }
    
}