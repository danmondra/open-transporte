package com.opentransport.backend.model;

// import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Getter;
import lombok.Setter;

// @Entity
// @Table(name = "trips")
@Getter
@Setter
public class Trip {

 //   @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

  //  @Column(name = "user_id")
    private Integer userId;

    private LocalDate date;
    private LocalTime time;
    private BigDecimal cost;

 //   @Column(name = "origin_station")
    private String originStation;

 //   @Column(name = "destination_station")
    private String destinationStation;
}