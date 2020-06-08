export default [
  `
    ##  What is the inheritance?
    In object-oriented programming, inheritance refers to the ability of an object to take on one or more characteristics from other classes of objects. The characteristics inherited are usually instance variables or member functions. An object that inherits these characteristics is known as a subclass. The object it inherits them from is known as a superclass.

    ### What is inheritance used for?
    The purpose of inheritance is to consolidate and re-use code. For example, if the objects car, truck, and motorcycle are subclasses of the superclass vehicle, code that applies to all of them can be consolidated into a vehicle superclass. The subclasses will inherit this code and any future changes made to it, automatically.
    ***
  `,
  `## Types of Inheritance
    + Single inheritance - Subclasses inherit characteristics from a single superclass.
    ![Single](https://www.guru99.com/images/java/single_inheritance.png)
    + Multiple inheritance - A subclass may have more than one superclass and inherit characteristics from all of them.
    ![Multiple](https://www.guru99.com/images/java/multiple.png)
    + Multilevel inheritance - A subclass may have its own subclasses. In other words, a subclass of a superclass can itself be a superclass to other subclasses.
    ![Multilevel](https://www.guru99.com/images/java/multilevel.png)
    + Hierarchical inheritance - A base class acts as the parent superclass to multiple levels of subclasses.
    ![Hierarchical](https://www.guru99.com/images/java/hierarchy.png)
    + Hybrid inheritance - A combination of one or more of the other inheritance types.
    ![Hybrid](https://www.guru99.com/images/java/hybrid.jpeg)
    ***## Types of Inheritance
    + Single inheritance - Subclasses inherit characteristics from a single superclass.
    ![Single](https://www.guru99.com/images/java/single_inheritance.png)
    + Multiple inheritance - A subclass may have more than one superclass and inherit characteristics from all of them.
    ![Multiple](https://www.guru99.com/images/java/multiple.png)
    + Multilevel inheritance - A subclass may have its own subclasses. In other words, a subclass of a superclass can itself be a superclass to other subclasses.
    ![Multilevel](https://www.guru99.com/images/java/multilevel.png)
    + Hierarchical inheritance - A base class acts as the parent superclass to multiple levels of subclasses.
    ![Hierarchical](https://www.guru99.com/images/java/hierarchy.png)
    + Hybrid inheritance - A combination of one or more of the other inheritance types.
    ![Hybrid](https://www.guru99.com/images/java/hybrid.jpeg)
    ***
  `,
  `## Example of Inheritance
    java
    class Doctor {
     void Doctor_Details() {
      System.out.println("Doctor Details...");
     }
    }java
    class Surgeon extends Doctor {
     void Surgeon_Details() {
      System.out.println("Surgen Detail...");
     }
    }java
    public class Hospital {
     public static void main(String args[]) {
      Surgeon s = new Surgeon();
      s.Doctor_Details();
      s.Surgeon_Details();
     }
    }### Super keyword
    The super keyword is similar to "this" keyword.
    The keyword super can be used to access any data member or methods of the parent class.
    Super keyword can be used at variable, method and constructor level.
    Syntax:
    java
    super.<method-name>();
  `,
  `#### Video material
   [![Example of video about inheritance](https://cdn.photo-555.com/img/java-tutorials/5445443/inheritance-java.png.webp)]
   (https://www.youtube.com/watch?v=9JpNY-XAseg)
  `,
];
